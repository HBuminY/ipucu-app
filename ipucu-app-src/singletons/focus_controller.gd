extends Node

var focused_node:Control;

class OutlineDrawer extends Control:
	var outline_color: Color = Color.CYAN
	var thickness: float = 3.0
	func _ready() -> void:
		mouse_filter = Control.MOUSE_FILTER_IGNORE
		set_anchors_and_offsets_preset(Control.PRESET_FULL_RECT)
		if get_parent() is Control:
			get_parent().resized.connect(queue_redraw)
	func _draw() -> void:
		var rect = Rect2(Vector2.ZERO, size)
		draw_rect(rect, outline_color, false, thickness)

func set_outline(node: Control, state: bool, color: Color = Color.CYAN, thickness: float = 3.0) -> void:
	if not is_instance_valid(node):
		return
	var drawer = node.get_node_or_null("__OutlineDrawer__")
	if state:
		if drawer:
			drawer.outline_color = color
			drawer.thickness = thickness
			drawer.queue_redraw()
		else:
			var new_drawer = OutlineDrawer.new()
			new_drawer.name = "__OutlineDrawer__"
			new_drawer.outline_color = color
			new_drawer.thickness = thickness
			node.add_child(new_drawer)
	else:
		if drawer:
			drawer.queue_redraw()
			drawer.queue_free()

func _input(event: InputEvent) -> void:
	if event is InputEventMouseButton:
		# Check if it was a LEFT CLICK and it was just PRESSED DOWN
		if event.button_index == MOUSE_BUTTON_LEFT and event.pressed or event.button_index == MOUSE_BUTTON_RIGHT and event.pressed:
			clear_focus();

func set_focus(node:Control):
	set_outline(focused_node, false);
	focused_node=node;
	set_outline(node, true);
	node.grab_focus();
	
func clear_focus():
	set_outline(focused_node, false);
	focused_node=null;
