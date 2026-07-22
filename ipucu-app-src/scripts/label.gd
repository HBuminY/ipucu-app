extends Label

func _process(_delta: float) -> void:
	text = str(Focus.focused_node);
