<template>
    <div>{{ props.uuid }}</div><br>
    <div>
        <div class="container" ref="container">
            <button @click="rerenderTree">Rerender Tree</button>
        </div>
    </div>
    <div id="dataInfoBox" class="infoBox" v-show="visibleBox">
        <div id="title">{{  currentInfoBox?.title }}</div>
        <div id="content">
            <div v-for=" cpost in currentInfoBox.content">
                <div style="display: flex;"><div><b>{{ cpost.key }}:</b></div><div style="padding-left: 20px;"> {{ cpost.value }}</div></div>
            </div>
        </div>
    </div>
</template>
  
<script setup lang="ts">
import { ref, onMounted, Ref } from 'vue';
import * as d3 from 'd3';
import { Node } from '@/types/node';
import { MockService } from '../services/mockservice'

const props = defineProps<{ uuid: string }>()
  

interface InfoBox{
    title:string,
    content: { key: string, value: string }[];
}

const visibleBox = ref(false);

const currentInfoBox : Ref<InfoBox> = ref({title : "", content: [{"key":"key", "value":"value"}]});

const mockService = new MockService();
const data = mockService.getNodeData("");

const container = ref<HTMLDivElement | null>(null);
let svg: d3.Selection<SVGSVGElement, unknown, null, undefined>;
let treeLayout: d3.TreeLayout<Node>;
let rootNode: d3.HierarchyNode<Node>;

onMounted(() => {
    const width = 550;
    const height = 350;

    svg = d3.select(container.value)
        .append('svg')
        .attr('height', height)
        .attr('width', width);

        
    treeLayout = d3.tree<Node>().size([width + -50, height - 50]);
    rootNode = d3.hierarchy(data);
    //rerenderTree();
});

function displayInfoBox(event: MouseEvent, node: d3.HierarchyNode<Node>){
    console.log("to remove later" + event.x);
    visibleBox.value = true;
    currentInfoBox.value.content = node.data.content;
    currentInfoBox.value.title = node.data.id;
}

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
        .on('click', (event, d) => displayInfoBox(event, d));
        //.on('mouseover', (event, d) => displayInfoBox(event, d));
        //.on('mouseout', () => visibleBox.value=false);

    nodes.append('circle')
        .attr('r', 15);

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
    rootNode = d3.hierarchy(mockService.getNodeData(props.uuid));
    svg.selectAll('*').remove();
    renderTree();
}
</script>
  
<style>
.infoBox{
    border: #2DD48F;
    background-color: #6B7280;
    position: relative;
    padding: 5px;
    margin: 2px;
}
.infoBox #title{
    background-color:white;
    padding: 5px;
    margin: 5px;
}
.infoBox #content{
    text-align: left;
    background-color: white;
    padding: 10px;
    margin: 5px;
}

.container {
    width: 100%;
    height: 100%;
    border: lightgray solid 1pt;
}

.node {
    fill: #2DD48F;
    stroke:  #041a2c(129, 175, 212);
    stroke-width: 4px;
    fill-opacity: 100%;
    cursor: crosshair;

}

.node circle {
    border: #2DD48F;
    stroke: #6B7280;
    stroke-width: 4px;
    fill-opacity: 100%;

}

.node text {
    font-size: 14px;
    font-family: sans-serif;
    color: #6B7280;
}

.link {
    fill: none;
    stroke: #BDBDBD;
    stroke-width: 2px;
}
</style>
  