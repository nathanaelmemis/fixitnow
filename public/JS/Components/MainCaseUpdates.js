import { formatDate } from '../utils.js'

class MainCaseUpdates {
    render(specificCase, updateID) {
        const update = specificCase['updates'][updateID]

        let updatesSection = ''

        updatesSection += 
            '<div class="main-case-updates-container">' + 
                '<p class="main-case-updates-sender">' + update['sender'] + '</p>' + 
                '<p class="main-case-updates-date">' + formatDate(update['timestamp']) + '</p>' + 
                '<div class="main-case-line-update-container">' +
                    '<hr class="main-case-line-update">' + 
                '</div>' +
                '<p class="main-case-updates-value">' + update['message'] + '</p>'      

        if (specificCase['updates'][updateID]['sender'] === 'Maintenance Department') {
            updatesSection += 
                '<img class="main-case-updates-trash-button" id="delete_button" data-value="' + updateID + '" src="assets/details/trash_icon.png">'
        }

        updatesSection +=
            '</div>'
        
        return updatesSection
    }
}

export { MainCaseUpdates }