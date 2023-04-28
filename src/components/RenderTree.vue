<template>
    <div class="border border-red-50 p-1 m-1">{{ props.uuid }}</div><br>
    <div>

    </div>
    <div id="dataInfoBox" class="border-spacing-2 border-emerald-400 border-2 w-fit m-2 bg-slate-200" v-show="visibleBox">
        <div class="overflow-ellipsis bg-slate-400  border-emerald-400 border pb-2 pt-1 mb-1 ">{{ currentInfoBox?.title }}</div>
        <div>
            <div v-for=" cpost in currentInfoBox.content">
                <div class="text-left hover:bg-gray-500 p-1 cursor-pointer flex flex-row">
                    <div class="text-left pr-10 cursor-pointer w-1/3 font-bold">{{ cpost.key }}:</div>
                    <div class="text-left pl-10 cursor-pointer w-2/3"> {{ cpost.value }}</div>
                </div>
            </div>
        </div>
    </div>
    <div class="" ref="container">
            <button @click="rerenderTree">&nbsp;&nbsp;&nbsp;</button>
        </div>
</template>
  
<script setup lang="ts">
import { ref, onMounted, Ref, watch } from 'vue';
import * as d3 from 'd3';
import { Node } from '@/types/node';
import { MockService } from '../services/mockservice'

const props = defineProps<{ uuid: string }>();
const visibleBox = ref(false);
const mockService = new MockService();
const nodeData = mockService.getNodeData("");

watch(() => props.uuid, () => {
    console.log("property is now: "+props.uuid);
    rerenderTree();
});

interface InfoBox {
    title: string,
    content: { key: string, value: string }[];
}

const currentInfoBox: Ref<InfoBox> = ref({ title: "", content: [{ "key": "key", "value": "value" }] });

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
    rootNode = d3.hierarchy(nodeData);
});


function displayInfoBox(event: MouseEvent, node: d3.HierarchyNode<Node>) {
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
        .attr('class', 'stroke-slate-200 fill-slate-800 stroke-2')
        .attr('x1', (d) => d.source.x)
        .attr('y1', (d) => d.source.y + 30)
        .attr('x2', (d) => d.target.x)
        .attr('y2', (d) => d.target.y + 30);

    const nodes = svg.selectAll('.node')
        .data(rootNode.descendants())
        .join('g')
        .attr('class', 'fill-slate-400 stroke-slate-200 stroke-2 hover:fill-slate-500 cursor-pointer')
        .attr('transform', (d: any) => `translate(${d.x},${d.y + 30})`)
        .on('click', (event, d) => displayInfoBox(event, d));
    //.on('mouseover', (event, d) => displayInfoBox(event, d));
    //.on('mouseout', () => visibleBox.value=false);

    nodes.append('circle')
        .attr('r', 15)
        .attr('class', 'stroke-slate-900');

    nodes.append('text')
        .attr('dx', '-15')
        .attr('dy', '-18')
        .attr('class', 'stroke-slate-900 stroke-1')
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