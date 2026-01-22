function ReportUpload() {
  const upload = () => {
    alert("PDF extraction demo – backend ready");
  };

  return (
    <div className="card bg-dark text-white p-4 mt-4">
      <h5>Extract Data from Report</h5>
      <input type="file" className="form-control mb-3" />
      <button className="btn btn-primary" onClick={upload}>
        Extract & Add Project
      </button>
    </div>
  );
}

export default ReportUpload;
