document.getElementById('issueInputForm').addEventListener('submit', submitIssue);

 let selectById = id=>{
    return document.getElementById(id);
 }
function submitIssue(e) {
  const getInputValue = id => document.getElementById(id).value;
  const description = getInputValue('issueDescription');
  const severity = getInputValue('issueSeverity');
  const assignedTo = getInputValue('issueAssignedTo');
  const id = Math.floor(Math.random()*100000000) + '';
  const status = 'Open';

  const issue = { id, description, severity, assignedTo, status };
  let issues = [];
  if (localStorage.getItem('issues')){
    issues = JSON.parse(localStorage.getItem('issues'));
  }
  issues.push(issue);
  localStorage.setItem('issues', JSON.stringify(issues));

  document.getElementById('issueInputForm').reset();
  fetchIssues();
  e.preventDefault();
}

const closeIssue = id => {
  const issues = JSON.parse(localStorage.getItem('issues'));
  const currentIssue = issues.find(issue => issue.id === id.toString());
  currentIssue.status = 'Closed';
  localStorage.setItem('issues', JSON.stringify(issues));
  fetchIssues();
}

const deleteIssue = id => {
  const issues = JSON.parse(localStorage.getItem('issues'));
  const remainingIssues = issues.filter(issue => issue.id !== id );
  let deleteCount = parseInt(localStorage.getItem('deleteCount')) || 0;
  deleteCount += 1;
  localStorage.setItem('deleteCount', deleteCount);
  localStorage.setItem('issues', JSON.stringify(remainingIssues));
  fetchIssues();
}

const fetchIssues = () => {
  const issues = JSON.parse(localStorage.getItem('issues'));
  const issuesList = document.getElementById('issuesList');
  const issueSolved = selectById('issueSolved');
  const issueDeleted = selectById('issueDeleted');
  issuesList.innerHTML = '';

  let issueNumber = selectById('issueNumber');
  issueNumber.innerHTML = issues.length; 

  const issueSolvedNumber = issues.filter(issue => issue.status === 'Closed').length;
  issueSolved.innerHTML = issueSolvedNumber;

  const deleteCount = parseInt(localStorage.getItem('deleteCount')) || 0;
  issueDeleted.innerHTML = deleteCount;

  for (var i = 0; i < issues.length; i++) {
    const {id, description, severity, assignedTo, status} = issues[i];
  
    let labelClass = status === 'Closed' ? 'label label-warning' : 'label label-info';

    

    

    issuesList.innerHTML +=   `<div class="well">
                              <h6>Issue ID: ${id} </h6>
                              <p><span class="${labelClass}"> ${status} </span></p>
                              <h3 id="des-${id}" class="${status === 'Closed' ? 'line' : ''}">${description}</h3>
                              <p><span class="glyphicon glyphicon-time"></span> ${severity}</p>
                              <p><span class="glyphicon glyphicon-user"></span> ${assignedTo}</p>
                              <a href="#" onclick="closeIssue('${id}')" class="btn btn-warning">Close</a>
                              <a href="#" onclick="deleteIssue('${id}')" class="btn btn-danger">Delete</a>
                              </div>`;
  }
}
