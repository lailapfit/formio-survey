window.onload = function () {
    // 1) Render the instance of Formio
    // 1) Render the instance of Formio
    Formio.setBaseUrl('https://webform-designer-stg.iop.ohio.gov');
    // Formio.setProjectUrl('https://gczorxncusomhpg.form.io/comment');
   Formio.setProjectUrl('https://webform-designer-stg.iop.ohio.gov/stageauthoring-odot');
    Formio.createForm(document.getElementById('formio'), 'https://webform-designer-stg.iop.ohio.gov/stageauthoring-odot/survey', {
        hooks: {
            // 2) Use hooks to insert the data for Project ID and geo-Location before submitting the data
            beforeSubmit: (submission, next) => {
                // Alter the submission
                // submission.data.page1Location = 'Franklin';
                // submission.data.page1ProjectId = '01';
                // submission.data.page1Status = 'New';
                submission.data.contact.data.location = 'Franklin';
            submission.data.contact.data.projectId = '00003';
            submission.data.contact.data.projectName = 'project 00003';
          submission.data.commentStatus = 'new';
          submission.data.commentType = 'survey';
          this.console.log("Only the before submit hook submitted");
                // Only call next when we are ready.
                next();
            }
        },
        // breadcrumbSettings: {
        //     clickable: false
        // }
        // buttonSettings: {
        //     showCancel: true,
        //     showPrevious: false
        // }
    })
        .then(function (form) {
            // 3) Rending images within the select boxes component
            form.on('prevPage', (submission) => {
                renderImages(".noiseWallImages", "span");
            });

            form.on('nextPage', (submission) => {
                renderImages(".noiseWallImages", "span");
            });
            // 3) Submit the form data
            form.on('submit', (submission) => {
                console.log('The form was just submitted!!!');
                console.log(submission);
                console.log(submission.data);
                console.log(submission._id);
            });
            // 4) Catching errors
            form.on('error', (errors) => {
                console.log('We have errors!');
            });
            // 5) If a Thank You page is needed
            // form.on('submitDone', function(completed) {
            //     window.location = './thanks.html';
            // })
        });
        // let el = document.querySelector("span.page-link");
        // el.style.pointerEvents = "none";  
};




function renderImages(className, elementName) {
    let spans = document.querySelectorAll(className + " " + elementName);
    this.console.log(spans);
    for (let i = 0; i < spans.length; i++) {
        let currentSpan = spans[i];
        currentSpan.innerHTML = '<img style="height:200px; width:200px" src="' + currentSpan.innerText + '">';
    }
};

