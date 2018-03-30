import React from 'react';
import { connect } from 'react-redux';

class DocumentDisplay extends React.Component {
    componentDidUpdate() {
        this.area.value = this.props.document.title;
    }
    // constructor() {
    //     super();
    //     this.refetchFunc = this.refetchFunc.bind(this);
    // }
    // refetchFunc = () => {
    //     this.area.value = this.props.document.title;
    // }
    render() {
        return (
            <textarea name="" cols="30" rows="10" ref={(ref) => {this.area = ref}}></textarea>
        )    
    }
}

const mapStateToProps = (state) => {
    return {
        document: state.document
    }
}

export default connect(mapStateToProps)(DocumentDisplay);