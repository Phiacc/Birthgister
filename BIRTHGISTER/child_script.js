
document.getElementById('hamburger').addEventListener('click', function() {
    this.classList.toggle('active');
    document.getElementById('menu').classList.toggle('active');
});

const fields = [
    "name",
    "dateofbirth",
    "age",
    "gender",
    "place",
    "town",
    "mothersName",
    "mothersResidence",
    "mothersAgeAtBirth",
    "mothersMaritalStatus",
    "mothersNationality",
    "mothersStateOfOrigin",
    "mothersOccupation",
    "mothersPhoneNumber",
    "mothersNationalID",
    "fathersName",
    "fathersResidence",
    "fathersCurrentAge",
    "fathersNationality",
    "fathersStateOfOrigin",
    "fathersOccupation",
    "fathersPhoneNumber",
    "fathersNationalID",
    "informantName",
    "informantRelationshipToChild",
    "informantResidence",
    "informantNationalID",
    "informantPhoneNumber",
];
function validateChildForm(e) {
    e.preventDefault()
    let isValid = true;

    function checkEmptyFields() {
        for (let i = 0; i < fields.length; i++) {
          const fieldValue = document.getElementById(fields[i]).value;
          if (fieldValue === "") {
            return false;
          }
        }
        return true;
      }

      if (!checkEmptyFields()) {
        alert("Please complete all details before submitting.");
        isValid = false;
      }

      const childAge = document.getElementById("age").value;
      if (isNaN(childAge)) {
        alert("Please enter a valid number for the child's age.");
        isValid = false;
      }


      const gender = document.querySelector('input[name="gender"]:checked');
      if (!gender) {
        alert("Please select a gender before submitting.");
        isValid = false;
      }

      if(isValid) {
          submitChildData(e)
      }

      return isValid;
    }


async function submitChildData(e) {
    e.preventDefault()

    try {
        const data = fields.map(fieldName => {
            const fieldValue = document.getElementById(fieldName).value;
            return { [fieldName]: fieldValue };
        });
        const file = document.getElementById('photo').files[0]
        const photo = await fileToBase64(file)

        const combinedData = Object.assign({ child: true, photo: photo }, ...data);

        // Display the combined data in the console (you can modify this part based on your needs)
        console.log('Combined Data:', combinedData);

        // axios.post('https://birthgister.vercel.app/api/users', combinedData, {
        //     headers: {
        //         'Content-Type': 'application/json',
        //     }
        // })
        //     .then(function (response) {
        //         console.log('Data submitted successfully:', response.data);
        //         alert('Data submitted successfully!');
        //     })
        //     .catch(function (error) {
        //         console.error('Error submitting data:', error);
        //         alert('Error submitting data. Please try again.');
        //     });


        fetch('https://birthgister.vercel.app/api/users', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(combinedData),
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(async (data) => {
                console.log('Data submitted successfully:', data);
                alert('Data submitted successfully!');

                const id = await data.data.id
                console.log(`/certificate?id=${id}`)

                if(await id) {
                    window.location.href = `/certificate/?id=${id}`
                }
            })
            .catch(error => {
                console.error('Error submitting data:', error);
                alert('Error submitting data. Please try again.');
            });

    } catch(e) {
        alert(e.message)
    }
}


function fileToBase64(file) {
    return new Promise((resolve, reject) => {
        const maxSizeInBytes = 1024 * 1024; // 1MB

        // Check file size before attempting to read
        if (file.size > maxSizeInBytes) {
            const error = new Error('File size exceeds the limit (1MB). Please choose a smaller file.');
            reject(error);
            return;
        }

        const reader = new FileReader();

        reader.onload = function (event) {
            resolve(event.target.result.split(',')[1]); // Extract the Base64-encoded part
        };

        reader.onerror = function (error) {
            reject(error);
        };

        reader.readAsDataURL(file);
    });
}