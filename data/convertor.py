import pandas as pd

# Load the Excel file
excel_file = 'gaikwad.xlsx'  # Replace with your Excel file name
df = pd.read_excel(excel_file)

# Convert to JSON
json_file = 'gaikwad.json'  # Desired output file name
# df.to_json(json_file, orient='records', lines=True)  # You can change 'orient' as needed
df.to_json(json_file, orient='records', lines=False, force_ascii=False)  # Set force_ascii=False


print(f"Converted {excel_file} to {json_file}")