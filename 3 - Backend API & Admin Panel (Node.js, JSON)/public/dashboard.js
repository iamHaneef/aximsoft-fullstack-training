const token = localStorage.getItem("token"); // token get here

if(!token)
{
    window.location.href = "/admin.html";
}

fetchData();

async function fetchData() {
    

    try {
        const res = await fetch("api/contact", {
            headers: {
                Authorization: "Bearer " + token
            }
        });
        const data = await res.json();
        const dataTable = document.getElementById("dataTable");
        dataTable.innerHTML = "";

        data.forEach(el => {

            const row = `
            <tr>
                <td>${el.full_name}</td>
                <td>${el.email}</td>
                <td>${el.message}</td>
                <td>${el.created_At}</td>
            </tr>
            `;

            dataTable.innerHTML += row;

        });

    }
    catch (err) {
        console.log("error");
    }
}