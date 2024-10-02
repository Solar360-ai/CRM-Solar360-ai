import camelot.io as camelot
import pandas as pd

# # Path to the PDF file
# pdf_path = 'C:/Users/anike/OneDrive/Documents/GitHub/CRM-Solar360-ai/HT-LTIP E-Bill.pdf'

# # Extract tables from the PDF
# tables = camelot.read_pdf(pdf_path, pages='all')
# print(tables)
# # Initialize dataframes
# billing_history_df = None
# billing_details_df = None

# # Iterate through the extracted tables
# for table in tables:
#     # print(table.df)
#     df = table.df
#     # Check for "Billing History" table
#     if 'Bill Month' in df.values:
#         billing_history_df = df
#     # Check for "Billing Details" table
#     elif 'TOD Zone' in df.values:
#         billing_details_df = df

# # Display the extracted dataframes
# if billing_history_df is not None:
#     print("Billing History DataFrame:")
#     print(billing_history_df)
# else:
#     print("Billing History table not found.")

# if billing_details_df is not None:
#     print("Billing Details DataFrame:")
#     print(billing_details_df)
# else:
#     print("Billing Details table not found.")


import pytesseract
from PIL import Image
import pandas as pd

# Path to the images
monthly_bill_image_path = 'C:/Users/anike/OneDrive/Documents/GitHub/CRM-Solar360-ai/monthly_bill.jpg'
tod_zone_units_image_path = 'C:/Users/anike/OneDrive/Documents/GitHub/CRM-Solar360-ai/Tod_zone_units.jpg'

pytesseract.pytesseract.tesseract_cmd = r'C:/Program Files/Tesseract-OCR/tesseract.exe'
# Function to extract table from image and convert to dataframe
def extract_table_from_image(image_path):
    # Open the image
    image = Image.open(image_path)
    # Use pytesseract to extract text
    text = pytesseract.image_to_string(image)
    # Split the text into lines
    lines = text.split('\n')
    # Split each line into columns
    data = [line.split() for line in lines if line.strip() != '']
    # Convert to dataframe
    df = pd.DataFrame(data)
    return df

# Extract tables from images
monthly_bill_df = extract_table_from_image(monthly_bill_image_path)
tod_zone_units_df = extract_table_from_image(tod_zone_units_image_path)

# Display the extracted dataframes
print("Monthly Bill DataFrame:")
print(monthly_bill_df)

print("TOD Zone Units DataFrame:")
print(tod_zone_units_df)

