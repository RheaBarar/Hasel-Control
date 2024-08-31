def remove_whitespace(data):
    cleaned_data = [[element.strip() for element in row] for row in data]
    return cleaned_data

def convert_data_types(data, column_types):
    converted_data = []
    for row in data:
        converted_row = []
        for i, element in enumerate(row):
            try:
                converted_row.append(column_types[i](element))
            except ValueError:
                converted_row.append(None)  
        converted_data.append(converted_row)
    return converted_data

def handle_missing_values(data, fill_value=0):
    cleaned_data = [[element if element not in (None, '') else fill_value for element in row] for row in data]
    return cleaned_data

def remove_noise(data, min_threshold, max_threshold):
    cleaned_data = [
        [element if min_threshold <= element <= max_threshold else None for element in row]
        for row in data
    ]
    return cleaned_data
