<template>
    <div>
        <div class="container" ref="container"></div>
        <button @click="rerenderTree">Rerender Tree</button>
    </div>
</template>
  
<script setup lang="ts">
import { ref, onMounted } from 'vue';
import * as d3 from 'd3';
import { Node } from '@/types/node';
import { MockService } from '../services/mockservice'

const mockService = new MockService();
const data = mockService.getNodeData("");

const container = ref<HTMLDivElement | null>(null);
let svg: d3.Selection<SVGSVGElement, unknown, null, undefined>;
let treeLayout: d3.TreeLayout<Node>;
let rootNode: d3.HierarchyNode<Node>;

onMounted(() => {
    const width = 350;
    const height = 350;

    svg = d3.select(container.value)
        .append('svg')
        .attr('height', height)
        .attr('width', width);


    treeLayout = d3.tree<Node>().size([width - 50, height - 50]);

    rootNode = d3.hierarchy(data);
    renderTree();
});

function renderTree() {
    const links = treeLayout(rootNode).links();

    if (!links) {
        console.error('No links found');
        return;
    }

    svg.selectAll('.link')
        .data(links)
        .join('line')
        .attr('class', 'link')
        .attr('x1', (d) => d.source.x)
        .attr('y1', (d) => d.source.y + 30)
        .attr('x2', (d) => d.target.x)
        .attr('y2', (d) => d.target.y + 30);

    const nodes = svg.selectAll('.node')
        .data(rootNode.descendants())
        .join('g')
        .attr('class', 'node')
        .attr('transform', (d: any) => `translate(${d.x},${d.y + 30})`)
        .on('click', (event, d) => console.log(d.data.name + event));

    nodes.append('circle')
        .attr('r', 10);

    nodes.append('text')
        .attr('dx', '-3em')
        .attr('dy', '-1em')
        .text((d) => d.data.name);

    if (!container.value) {
        console.error('No container element found');
        return;
    }
}

function rerenderTree() {
    rootNode = d3.hierarchy(mockService.getNodeData("ff8cf69c-968c-47bc-b834-f1cbb9f08932"));
    svg.selectAll('*').remove();
    renderTree();
}
</script>
  
<style>
.container {
    width: 100%;
    height: 100%;
    border: red solid 1pt;
}

.node {
    fill: #2196F3;
    stroke:  #041a2c(129, 175, 212);
    stroke-width: 4px;
    fill-opacity: 100%;

}

.node circle {
    border: #041a2c;
    stroke:  #041a2c(129, 175, 212);
    stroke-width: 4px;
    fill-opacity: 100%;

}

.node text {
    font-size: 14px;
    color: #212121;
    font-family: sans-serif;
}

.link {
    fill: none;
    stroke: #BDBDBD;
    stroke-width: 2px;
}
</style>
  