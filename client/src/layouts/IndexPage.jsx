import React, {Component} from 'react';
import LoginForm from "../components/forms/login/LoginForm.jsx";
import PageWithCenteredContent from "./common/PageWithCenteredContent.jsx";

class IndexPage extends Component {

    render() {
        return (
            <PageWithCenteredContent>
                <LoginForm />
            </PageWithCenteredContent>
        );
    }
}

export default IndexPage;