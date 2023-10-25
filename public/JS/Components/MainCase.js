import { formatDate } from '../utils.js'

class MainCase {
    render(specificCase, status, caseID) {
        return '<div class="main-case-image">' +
                    '<img src="' + specificCase['photos'][0]+ '" alt="Photo submitted by user">' + 
                '</div>' +
                '<div class="main-case-image">' +
                    '<img src="' + specificCase['photos'][1]+ '" alt="Photo submitted by user">' + 
                '</div>' +
                '<div class="main-case-image">' +
                    '<img src="' + specificCase['photos'][2]+ '" alt="Photo submitted by user">' + 
                '</div>' +
                '<div class="main-case-info">' +
                    '<p class="main-case-info-label">Category:</p><p class="main-case-info-value">' + specificCase['category'] + '</p>' + 
                    '<p class="main-case-info-label">Case ID:</p><p class="main-case-info-value">' + caseID + '</p>' + 
                    '<p class="main-case-info-label">Submitted On:</p><p class="main-case-info-value">' + formatDate(specificCase['submitted_on']) + '</p>' + 
                    '<p class="main-case-info-label">Submitted By:</p><p class="main-case-info-value">' + specificCase['submitted_by'] + '</p>' + 
                    '<p class="main-case-info-label">Location:</p><p class="main-case-info-value">' + specificCase['location'] + '</p>' + 
                    '<p class="main-case-info-label">Urgency Level:</p><p class="main-case-info-value">' + specificCase['urgency'] + '</p>' + 
                    '<p class="main-case-info-label">Status:</p><p class="main-case-info-value-status">' + status + '</p>' + 
                    '<button class="main-case-info-value-status-button-off" id="update-button">Update Status</button>' +
                '</div>' +
                '<div class="main-case-details">' +
                    '<p class="main-case-details-label">Details:</p>' + 
                    '<p class="main-case-details-value">' + specificCase['details'] + '</p>' + 
                '<div class="main-case-updates">' +
                    '<p class="main-case-updates-label">Updates:</p>'
    }
}

export { MainCase }