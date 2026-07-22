extends PanelContainer

var card_index = 0;

func _ready() -> void:
	Focus.set_focus(self)

func _unhandled_input(event: InputEvent) -> void:
	if Focus.focused_node==self:
		if event.is_action_pressed("escape"):
			Focus.clear_focus()
		if event.is_action_pressed("navigate_left") && card_index>0:
			var node = Project.cards[card_index-1].node
			Focus.set_focus(node)
		if event.is_action_pressed("navigate_right") && card_index<Project.cards.size()-1:
			var node = Project.cards[card_index+1].node
			Focus.set_focus(node)
