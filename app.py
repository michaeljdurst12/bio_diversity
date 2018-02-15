from flask import Flask, jsonify, render_template
import pandas as pd

belly_data = pd.read_excel("belly_data.xlsx", index=None)
samples = pd.read_csv("belly_button_biodiversity_samples.csv")
meta = pd.read_csv("Belly_Button_Biodiversity_Metadata.csv")

app = Flask(__name__)

@app.route("/")
def home():
    return render_template("index.html")

@app.route("/names")
def sample_id():
    samples_ids = list(samples.columns)
    samples_ids = samples_ids[1:]
    return jsonify(samples_ids)

@app.route("/otu")
def description():
    # print(belly_data.count())
    descriptions = list(belly_data["Lowest Taxonomic Level of Bacteria/Archaea Found"])
    return jsonify(descriptions)

@app.route("/metadata/<sample>")
def metadata_data(sample):
    print("in python sample=", sample)
    # datas = (meta_2.loc[:, "SAMPLEID":"LOCATION"]).to_json()
    # return(datas)
    return jsonify("5")





if __name__ == '__main__':
    app.run(debug=True)
