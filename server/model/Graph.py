from __future__ import annotations
from .Block import *
import networkx as nx
import matplotlib.pyplot as plt



class Graph:
    """Graph data-structure to store a DAG Blockchain
    """
    def __init__(self) -> None:
        self.edge_dictionary = dict()
        self.number_nodes = 0
        
    def addBlock(self, parentBlock: Block, toAddBlock: Block) -> None:
        """Adds block to the graph

        Args:
            parentBlock (Block): Block object representing the previous block
            toAddBlock (Block): Block object representing the block to be added
        """
        # If parentBlock is none it is the 'genesis' block
        if parentBlock is None:
            self.edge_dictionary[toAddBlock.getHash()] = []
        else:
            self.edge_dictionary[parentBlock.getHash()].append(toAddBlock.getHash())
            self.edge_dictionary[toAddBlock.getHash()] = []
            
    def printGraph(self, mapping) -> None:
        """Prints the graph in a planar format
        """
        # Constructing the graph
        graph = nx.DiGraph()
        for key, values in self.edge_dictionary.items():
            graph.add_node(mapping[key])
            for node in values:
                graph.add_edge(mapping[key], mapping[node])
                
        fig, ax = plt.subplots(figsize=(30, 20))
        options = {
            "pos": nx.planar_layout(graph),
            "font_size": 5,
            "node_size": 5000,
            "node_color": "white",
            "edgecolors": "black",
            "linewidths": 1,
            "width": 1,
            "ax": ax
        }
        nx.draw_networkx(graph, **options)
        plt.axis("off")
        plt.show()
    
    def exportGraph(self, mapping):
        graph = nx.DiGraph()
        for key, values in self.edge_dictionary.items():
            graph.add_node(mapping[key])
            for node in values:
                graph.add_edge(mapping[key], mapping[node])
        
        fig, ax = plt.subplots(figsize=(20, 10))
        
        options = {
            "pos": nx.planar_layout(graph),
            "font_size": 5,
            "node_size": 5000,
            "node_color": "white",
            "edgecolors": "black",
            "linewidths": 1,
            "width": 1,
            "ax": ax
        }
        
        nx.draw_networkx(graph, **options)
        plt.savefig("src\\main\\storage\\graph.png", format="PNG")
        

    @staticmethod
    def loadBlockGraph(blocks: list[Block], mappings: dict) -> Graph:
        graph = Graph()
        
        for block in blocks:
            if block.parent_hash is not None:
                graph.addBlock(mappings[block.parent_hash], block)
            else:
                graph.addBlock(None, block)
            
        return graph