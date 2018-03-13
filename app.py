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
    
    descriptions = list(belly_data["Lowest Taxonomic Level of Bacteria/Archaea Found"])
    return jsonify(descriptions)

@app.route("/metadata/<sample_id>")
def metadata(sample_id):
    sample_id = int(sample_id.replace("BB_", ""))
    match = meta[meta['SAMPLEID'] == sample_id][['SAMPLEID', 'ETHNICITY', 'GENDER', 'AGE', 'LOCATION','BBTYPE']].to_dict(orient='records')[0]
    return jsonify(match)

@app.route("/sample/<sample_id>")
def choosen_sample(sample_id):
    df = samples[['otu_id', sample_id]].sort_values(sample_id, ascending=False).dropna().rename(
        columns={sample_id: "sample_values"}).to_dict(orient='list')
    return jsonify(df)




if __name__ == '__main__':
    app.run(debug=True)
