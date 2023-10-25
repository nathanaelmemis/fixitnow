class MainCaseStatusIMG {
    render(status) {
        switch (status) {
            case 'New':
                return '<img class="main-case-status-img" src="../assets/dashboard/new.png">'
            case 'Ongoing':
                return '<img class="main-case-status-img" src="../assets/dashboard/processing.png">'
            case 'Finished':
                return '<img class="main-case-status-img" src="../assets/dashboard/completed.png">'
        }
    }
}

export { MainCaseStatusIMG }