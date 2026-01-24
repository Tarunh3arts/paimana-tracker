import api from "./api";

function ReportUpload({ refresh }) {

  const upload = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("file", file);

    await api.post("/upload-report", formData);
    alert("Report processed & project added");
    refresh();
  };

  return (
    <div className="card bg-dark text-white p-4 mb-4">
      <h5>Upload Monthly Progress Report</h5>
      <input
        type="file"
        className="form-control mt-2"
        accept=".pdf,.docx"
        onChange={upload}
      />
      <small className="text-muted">
        Supports PDF / DOCX from PAIMANA reports
      </small>
    </div>
  );
}

export default ReportUpload;
