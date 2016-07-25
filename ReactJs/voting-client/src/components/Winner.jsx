/*jshint esversion: 6 */
import React from 'react';

export default React.createClass({
    render: function() {
        return <div>
            Winner is {this.props.winner}!
        </div>;
    }
});
