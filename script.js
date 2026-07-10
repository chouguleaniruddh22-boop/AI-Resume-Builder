// ===============================
// AI Resume Builder
// script.js 
// ===============================

// Login Check
if (
    window.location.pathname.includes("resume.html") &&
    localStorage.getItem("login") !== "true"
) {
    window.location.href = "index.html";
}

// Live Resume Preview
function previewResume() {

    document.getElementById("pName").innerText =
        document.getElementById("name").value || "Your Name";

    document.getElementById("pEmail").innerText =
        document.getElementById("email").value;

    document.getElementById("pPhone").innerText =
        document.getElementById("phone").value;

    document.getElementById("pAddress").innerText =
        document.getElementById("address").value;

    document.getElementById("pObjective").innerText =
        document.getElementById("objective").value;

    document.getElementById("pEducation").innerText =
        document.getElementById("education").value;

    document.getElementById("pSkills").innerText =
        document.getElementById("skills").value;

    document.getElementById("pProjects").innerText =
        document.getElementById("projects").value;

    document.getElementById("pExperience").innerText =
        document.getElementById("experience").value;

    document.getElementById("pCertification").innerText =
        document.getElementById("certification").value;
}

// Save Resume
function saveResume() {

    const resume = {

        name: document.getElementById("name").value,
        email: document.getElementById("email").value,
        phone: document.getElementById("phone").value,
        address: document.getElementById("address").value,
        objective: document.getElementById("objective").value,
        education: document.getElementById("education").value,
        skills: document.getElementById("skills").value,
        projects: document.getElementById("projects").value,
        experience: document.getElementById("experience").value,
        certification: document.getElementById("certification").value

    };

    localStorage.setItem(
        "resumeData",
        JSON.stringify(resume)
    );

    alert("Resume Saved Successfully!");

}

// Load Saved Resume
function loadResume() {

    const data = JSON.parse(
        localStorage.getItem("resumeData")
    );

    if (!data) return;

    document.getElementById("name").value = data.name;
    document.getElementById("email").value = data.email;
    document.getElementById("phone").value = data.phone;
    document.getElementById("address").value = data.address;
    document.getElementById("objective").value = data.objective;
    document.getElementById("education").value = data.education;
    document.getElementById("skills").value = data.skills;
    document.getElementById("projects").value = data.projects;
    document.getElementById("experience").value = data.experience;
    document.getElementById("certification").value = data.certification;

    previewResume();

}

// Auto Load Resume
window.onload = function () {

    loadResume();

};
// ===============================
// AI Resume Builder
// script.js 
// ===============================

// Logout
function logout() {

    localStorage.removeItem("login");

    window.location.href = "index.html";

}

// Delete Resume
function deleteResume() {

    if(confirm("Are you sure you want to delete the saved resume?")){

        localStorage.removeItem("resumeData");

        document.getElementById("resumeForm").reset();

        previewResume();

        alert("Resume Deleted Successfully.");

    }

}

// Form Validation
function validateForm(){

    let name=document.getElementById("name").value.trim();
    let email=document.getElementById("email").value.trim();
    let phone=document.getElementById("phone").value.trim();

    if(name==="" || email==="" || phone===""){

        alert("Please fill all required fields.");

        return false;

    }

    return true;

}

// Save with Validation
const oldSaveResume = saveResume;

saveResume = function(){

    if(validateForm()){

        oldSaveResume();

        previewResume();

    }

};

// Download Resume PDF
async function downloadPDF(){

    previewResume();

    const { jsPDF } = window.jspdf;

    const doc = new jsPDF();

    let y = 20;

    function line(title,value){

        doc.setFont("helvetica","bold");
        doc.text(title,20,y);

        doc.setFont("helvetica","normal");
        doc.text(String(value || "-"),70,y);

        y += 10;

    }

    doc.setFontSize(18);
    doc.text("Resume",85,10);

    line("Name",document.getElementById("name").value);
    line("Email",document.getElementById("email").value);
    line("Phone",document.getElementById("phone").value);
    line("Address",document.getElementById("address").value);
    line("Objective",document.getElementById("objective").value);
    line("Education",document.getElementById("education").value);
    line("Skills",document.getElementById("skills").value);
    line("Projects",document.getElementById("projects").value);
    line("Experience",document.getElementById("experience").value);
    line("Certification",document.getElementById("certification").value);

    doc.save("Resume.pdf");

}