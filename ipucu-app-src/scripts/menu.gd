extends PanelContainer

const ProjectCard = preload("res://scenes/project_menu_button.tscn")

func _ready() -> void:
	var notes = Storage.list_all_notes();
	print('all notes list:\n',str(notes))
	for note_name in notes:
		var project_card = ProjectCard.instantiate()
		project_card.button_text = note_name;
		%ScrollContainer.add_child(project_card);
