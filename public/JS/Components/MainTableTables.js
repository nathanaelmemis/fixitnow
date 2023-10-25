import { formatDate } from '../utils.js'

class MainTableTables {
    render(eachCase, status) {
        return '<div class="main-table-tables-element-container" id="view-details" data-value1="' + eachCase['userID'] + '" data-value2="'+ eachCase['caseID'] +'">' +
                    '<div class="main-table-column-name-category">' +
                            '<p class="main-table-column-name" id="main-table-column-name">' + eachCase['category'] + '</p>' + 
                    '</div>' +
                    '<div class="main-table-column-name-case-id">' +
                        '<p class="main-table-column-name" id="main-table-column-name">' + eachCase['caseID'] + '</p>' + 
                    '</div>' +
                    '<div class="main-table-column-name-submitted-on">' + 
                        '<p class="main-table-column-name" id="main-table-column-name">' + formatDate(eachCase['submitted_on']) + '</p>' + 
                    '</div>' + 
                    '<div class="main-table-column-name-submitted-by">' + 
                        '<p class="main-table-column-name" id="main-table-column-name">' + eachCase['submitted_by'] + '</p>' + 
                    '</div>' +
                    '<div class="main-table-column-name-location">' + 
                        '<p class="main-table-column-name" id="main-table-column-name">' + eachCase['location'] + '</p>' + 
                    '</div>' +
                    '<div class="main-table-column-name-urgency">' + 
                        '<div class="main-' + eachCase['urgency'] + '-container">' +
                            '<p class="main-table-column-name" id="main-table-column-name">' + eachCase['urgency'] + '</p>' + 
                        '</div>' +
                    '</div>' +
                    '<div class="main-table-column-name-status">' +
                        status +
                    '</div>' +
                '</div>'
    }
}

export { MainTableTables }