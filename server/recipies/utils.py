def check_required_fields(json_data, required_fields=None):
    if required_fields is None:
        required_fields = []

    if isinstance(json_data, list):
        for j in json_data:
            for field in required_fields:
                if field not in j:
                    return False

    else:
        for field in required_fields:
            if field not in json_data:
                return False
    return True

def is_valid_recipe(data):
  return(
    check_required_fields(data, required_fields=["recipe"])
    and check_required_fields(data["recipe"], required_fields=["title", "description", "prep_time", "cook_time", "ingredients", "steps", "category"])
  )

def is_valid_category(data):
  return(
    check_required_fields(data, required_fields=["category"])
    and check_required_fields(data["recipe"], required_fields=["name"])
  )

