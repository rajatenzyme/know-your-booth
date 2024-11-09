import pandas as pd

# Load the Excel file
excel_file_name = '1731079433451'
excel_file = excel_file_name + '.xlsx'  # Replace with your Excel file name
df = pd.read_excel(excel_file)

# Convert to JSON
json_file = excel_file_name + '.json'  # Desired output file name
# df.to_json(json_file, orient='records', lines=True)  # You can change 'orient' as needed
df.to_json(json_file, orient='records', lines=False, force_ascii=False)  # Set force_ascii=False


print(f"Converted {excel_file} to {json_file}")