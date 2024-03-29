
const getCertId = Number(location.search.substring(4))
console.log(getCertId)

const registrarName = document.getElementById('registrarName')
const town_state = document.getElementById('town_state')
const name = document.getElementById('name')
const birthDay = document.getElementById('birthDay')
const birth_month_year = document.getElementById('birth_month_year')
const town = document.getElementById('town')
const parentName = document.getElementById('parentName')
const place = document.getElementById('place')
const currentDay = document.getElementById('currentDay')
const current_month_year = document.getElementById('current_month_year')

generateCertificate()
function generateCertificate () {
    const loadingOverlay = document.getElementById('loadingOverlay');
    loadingOverlay.style.display = 'flex';

    const animation = setupCertificateLoadingAnimation();

    setTimeout(async () => {
        try {

            fetch(`https://birthgister.vercel.app/api/users/${getCertId}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            })
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Network response was not ok');
                    }
                    return response.json();
                })
                .then(async (data) => {
                    console.log('Data retrieved successfully:', data);

                    registrarName.value = 'Ahweyevu Bridget'
                    town_state.value = data.user.place + ' / ' + data.user.town
                    name.value = data.user.name
                    birthDay.value = formatDate(data.user.dateofbirth).inputFormattedDate.day
                    birth_month_year.value = formatDate(data.user.dateofbirth).inputFormattedDate.month_year
                    town.value = data.user.town
                    parentName.value = data.user.father?.fathersName ?? data.user.mother?.mothersName ?? data.user.parent?.parentName
                    place.value = data.user.place
                    currentDay.value = formatDate(data.user.dateofbirth).todayFormattedDate.day
                    current_month_year.value = formatDate(data.user.dateofbirth).todayFormattedDate.month_year

                    loadingOverlay.style.display = 'none';
                    await animation.destroy();

                    if (window.confirm("Do you want to download the certificate?")) {
                        await downloadCertificate();
                        await alert('downloaded successfully!')
                    }
                })
                .catch(error => {
                    console.error('Error retrieving data:', error);
                    alert('Error creating certificate. Please try again.');
                })
                .finally(() => {
                loadingOverlay.style.display = 'none';
                animation.destroy();
            })

        } catch(e) {
            alert(e.message)
            loadingOverlay.style.display = 'none';
            animation.destroy();
        }
    }, 2000);
}

function formatDate(inputDate) {
    // Parse the input date string
    const inputParts = inputDate.split('/');
    const inputDay = inputParts[0];
    const inputMonth = inputParts[1];
    const inputYear = inputParts[2];

    // Convert month number to month name
    const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

    const formatSingleDate = (day, month, year) => {
        // Add the appropriate suffix to the day
        const dayWithSuffix = addDaySuffix(day);
        // Get the month name
        const monthName = monthNames[parseInt(month, 10) - 1];
        // Assemble the formatted date string
        const month_year = `${monthName}, ${year}`;

        return {
            day: dayWithSuffix,
            month_year: month_year
        }
    };

    const inputFormattedDate = formatSingleDate(inputDay, inputMonth, inputYear);

    // Get today's date
    const today = new Date();
    const todayDay = today.getDate();
    const todayMonth = today.getMonth() + 1; // Months are zero-based, so add 1
    const todayYear = today.getFullYear();

    const todayFormattedDate = formatSingleDate(todayDay, todayMonth, todayYear);

    return {
        inputFormattedDate,
        todayFormattedDate,
    };
}

function addDaySuffix(day) {
    // Add the appropriate suffix to the day
    if (day >= 11 && day <= 13) {
        return `${day}th`;
    } else {
        switch (day % 10) {
            case 1:
                return `${day}st`;
            case 2:
                return `${day}nd`;
            case 3:
                return `${day}rd`;
            default:
                return `${day}th`;
        }
    }
}


function downloadCertificate() {
    const element = document.getElementById('certificate');
    html2pdf(element, {
        margin: 5,
        filename: 'certificate.pdf',
        image: { type: 'png', quality: 0.98 },
        html2canvas: { scale: 2 },
        jsPDF: { unit: 'mm', format: 'a5', orientation: 'portrait' }
    }).then((pdf) => {
        pdf.save();
    });
}


function setupCertificateLoadingAnimation() {
    const lottieContainer = document.getElementById('lottieContainer');
    return bodymovin.loadAnimation({
        container: lottieContainer,
        renderer: 'svg',
        loop: true,
        autoplay: true,
        path: '../loading.json',
    });
}

