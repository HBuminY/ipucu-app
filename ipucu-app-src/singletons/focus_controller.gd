extends Node

var focused_node:Control;
var _bg_node #is the node that clears focus on click (e.g. background node)
#[can only be of a focusable class and owner of it's scene]
@export var focusable_classes:Array[String]=[]

class OutlineDrawer extends Control:
	var outline_color: Color = Color(1, 1, 1, 1)
	var thickness: float = 4
	var fill_color: Color = Color(0, 1, 1, 0.03)
	var corner_radius: int = 12 # Radius in pixels for the rounded corners

	func _ready() -> void:
		mouse_filter = Control.MOUSE_FILTER_IGNORE
		set_anchors_and_offsets_preset(Control.PRESET_FULL_RECT)
		if get_parent() is Control:
			get_parent().resized.connect(queue_redraw)

	func _draw() -> void:
		var rect = Rect2(Vector2.ZERO, size)
		var style_box = StyleBoxFlat.new()
		style_box.bg_color = fill_color
		style_box.border_color = outline_color
		style_box.set_border_width_all(thickness)
		style_box.set_corner_radius_all(corner_radius)
		draw_style_box(style_box, rect)


func get_node_class_name(node: Node) -> String:
	if not node:
		return ""
	var script = node.get_script()
	if script:
		var custom_name: StringName = script.get_global_name()
		if not custom_name.is_empty():
			return custom_name
	return node.get_class()

func set_outline(node: Control, state: bool, color: Color = Color(1,1,1,0.5) , thickness: float = 5.0) -> void:
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
		if event.pressed:
			print(str(_bg_node))
			var clicked_node = get_viewport().gui_get_hovered_control()
			if clicked_node.owner==_bg_node:
				clear_focus()
			elif clicked_node and is_instance_valid(clicked_node) and get_node_class_name(clicked_node.owner) in focusable_classes:
					set_focus(clicked_node.owner)
			
func clear_focus():
	set_outline(focused_node, false);
	focused_node=null;

func set_focus(node:Control):
	if !focused_node == node and is_instance_valid(node):
		set_outline(focused_node, false);
		focused_node=node;
		set_outline(node, true);
		node.call_deferred('grab_focus');
		#static check if on app/columns for smooth scroll
		var col_controller:ColController = get_node_or_null("/root/app/columns")
		if col_controller != null:
			await get_tree().process_frame
			col_controller.smoothly_scroll_to(node, 50);
			print(str(col_controller.target_scroll))

func set_bg_node(node:Control):
		_bg_node=node;
