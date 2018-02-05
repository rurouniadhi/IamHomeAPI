var UserRow = React.createClass({

    render: function () {
        return (
            <tr>
                <td>{this.props.item.Id}</td>
                <td>{this.props.item.Name}</td>
                <td>{this.props.item.Email}</td>
                <td>{this.props.item.PhoneNumber}</td>
                <td>{this.props.item.Status}</td>
            </tr>

        );
    }
});

var UserTable = React.createClass({

    getInitialState: function () {

        return {
            result: []
        }
    },
    componentWillMount: function () {

        var xhr = new XMLHttpRequest();
        xhr.open('get', this.props.url, true);
        xhr.onload = function () {
            var response = JSON.parse(xhr.responseText);

            this.setState({ result: response });

        }.bind(this);
        xhr.send();
    },
    render: function () {
        var rows = [];
        this.state.result.forEach(function (item) {
            rows.push(<UserRow key={item.Id} item={item} />);
        });
        return (<table className="table">
            <thead>
                <tr>
                    <th>Id</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>PhoneNumber</th>
                    <th>Status</th>
                </tr>
            </thead>

            <tbody>
                {rows}
            </tbody>

        </table>);
    }

});

ReactDOM.render(<UserTable url="api/users/" />,
    document.getElementById('user-grid'))  