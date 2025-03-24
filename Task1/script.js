function calculateAge() {
    const birthdate = document.getElementById("birthdate").value;
    if (!birthdate) {
        document.getElementById("result").innerText = "Please select a valid date.";
        return;
    }

    const birthDate = new Date(birthdate);
    const today = new Date();

    if (birthDate > today) {
        document.getElementById("result").innerText = "Invalid date. Please enter a past date.";
        return;
    }

    let age = today.getFullYear() - birthDate.getFullYear();
    let months = today.getMonth() - birthDate.getMonth();
    let days = today.getDate() - birthDate.getDate();

    if (days < 0) {
        months--;
        days += new Date(today.getFullYear(), today.getMonth(), 0).getDate();
    }

    if (months < 0) {
        age--;
        months += 12;
    }

    document.getElementById("result").innerText = `Your age is ${age} years, ${months} months, and ${days} days.`;
}
