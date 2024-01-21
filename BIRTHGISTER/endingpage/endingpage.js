const getCertId = Number(location.search.substring(4))
console.log(getCertId)

const print = document.getElementById('print');

const redirectToCertificate = () => {
        window.location.href = `/certificate/?id=${getCertId}`
}

print.addEventListener('click', redirectToCertificate)