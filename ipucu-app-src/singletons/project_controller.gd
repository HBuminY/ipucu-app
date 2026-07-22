extends Node

class CardData:
	var name: String
	var node: Control
	func _init(n: String, c:Control):
		name = n
		node = c

var cards:Array[CardData]=[]

func create_card(name:String, node:Control)->int:
	var new_card:CardData = CardData.new(name, node)
	cards.append(new_card)
	return cards.size()-1;
