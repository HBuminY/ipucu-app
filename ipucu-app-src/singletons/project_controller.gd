extends Node

var cards:Array[Card] = [];

##Adds a Card node to the project list
func add_card(card:Card)->int:
	cards.append(card)
	return cards.size()-1;
