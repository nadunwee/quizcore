document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('admin-add-an-exam-Btn').addEventListener('click', function () {
        // Show the popup when "Add an exam" is clicked
        document.querySelector('.admin-exam-popup-background').style.display = 'flex';
    });

    // Close popup on cancel
    document.querySelector('.admin-add-exam-cancel-button').addEventListener('click', function () {
        document.querySelector('.admin-exam-popup-background').style.display = 'none';
    });

    // Add exam when "Add" button is clicked
    document.getElementById('submit-exam').addEventListener('click', function (event) {
        event.preventDefault(); // Prevent form from submitting the normal way

        // Collect form data
        var examName = document.getElementById('popup-exam-name').value;
        var examinerID = document.getElementById('popup-examiner-name').value;
        var examDeadline = document.getElementById('popup-exam-deadline').value;
        var examPassword = document.getElementById('popup-exam-password').value;

        // Check if all fields are filled
        if (examName && examinerID && examDeadline && examPassword) {
            // Send data to the PHP backend using Fetch
            fetch('adminExam.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: `examName=${examName}&examinerID=${examinerID}&deadline=${examDeadline}&password=${examPassword}`,
            })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    // Add the new exam data to the UI dynamically
                    appendNewExamToUI(examName, examinerID, examDeadline, examPassword);
                    document.querySelector('.admin-exam-popup-background').style.display = 'none';
                } else {
                    alert('Error adding exam. Please try again.');
                }
            })
            .catch(error => {
                console.error('Error:', error);
            });
        } else {
            alert('Please fill in all fields.');
        }
    });
});

