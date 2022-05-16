const { checkout } = require("../app");

(function() {
    window.addEventListener("load", init);


    function init() {
        document.getElementById("submitBtn").addEventListener("click", submitBookInformation);
    }

    function submitBookInformation() {
        console.log("here");
        let formData = new FormData();
        formData.append("author",  document.getElementById("author").value);
        formData.append("title", document.getElementById("title").value);
        formData.append("year", document.getElementById("year").value);
        console.log(formData);
        fetch("/api/books", {method: "POST", body: formData})
            .then(checkStatus)
            .then(resp => resp.json())
            .then(sendResults)
            .catch(console.error);
    }

    function sendResults(response) {
        console.log(response);
    }



    // ------------------- HELPER FUNCTIONS -------------------

    /**
     * Checks to make sure there was no error in the requst. If an error it throws and error. No
     * matter what a response is returned. 
     * @param {object} response - JSON object containing errors;
     * @returns {object} JSON response
     */
     function checkStatus(response) {
        if (!response.ok) {
        console.log(response);
        throw Error ("Error in Request");
        }
        return response;
    }

});