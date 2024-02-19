import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

const D3JSChart = ({ d3JSDataSource }) => {

    const svgRef = useRef();

    useEffect(() => {
        if (d3JSDataSource.length === 0) {
            return;
        }

        const svg = d3.select(svgRef.current);
        const width = 400;
        const height = 450;
        const radius = Math.min(width, height) / 2;

        var colorScale = d3.scaleOrdinal()
            .domain(d3JSDataSource.map((v) => v.label))
            .range(["#c7d3ec", "#a5b8db", "#879cc4", "#677795", "#5a6782"]);

        const d3Pie = d3
            .pie()
            .sort(null)
            .value((d) => d.budget);

        const arc = d3
            .arc()
            .innerRadius(0)
            .outerRadius(radius);


        const d3Chart = svg
            .append('svg')
            .attr('width', width)
            .attr('height', height)
            .append('g')
            .attr('transform', `translate(${width / 2},${height / 2})`);

        d3Chart.selectAll('pieces')
            .data(d3Pie(d3JSDataSource))
            .enter()
            .append('path')
            .attr('d', arc)
            .attr('fill', (d) => colorScale(d.data.title))
            .attr('stroke', '#121926')
            .style('stroke-width', '2px');

        const label = d3.arc().innerRadius(100).outerRadius(radius);

        d3Chart.selectAll('pieces')
            .data(d3Pie(d3JSDataSource))
            .enter()
            .append('text')
            .text((d) => d.data.title)
            .attr(
                'transform',
                (d) => 'translate(' + label.centroid(d) + ')'
            )
            .style('text-anchor', 'middle')
            .style('font-size', 15);

    }, [d3JSDataSource]);



    return (
        <div className="chart-container" style={{ width: 400, height: 450 }}>
            <h3 style={{ textAlign: "center" }}>D3JS Pie Chart</h3>
            <svg ref={svgRef} width={400} height={450}>
                {d3JSDataSource.length === 0 && (
                    <text x="50%" y="50%" textAnchor="middle">Loading...</text>
                )}

            </svg>
        </div>
    );
};

export default D3JSChart;