import React from 'react';
import Select from 'react-select';
import { findDOMNode } from 'react-dom';
import assign from 'object-assign';
import { Fields } from 'FieldTypes';
import InvalidFieldType from 'keystone/admin/client/App/shared/InvalidFieldType';
import { plural } from 'keystone/admin/client/utils/string';
import { BlankState, Button, Form, Modal } from 'keystone/admin/client/App/elemental';

var UploadForm = React.createClass({
	displayName: 'UploadForm',
	propTypes: {
		isOpen: React.PropTypes.bool,
		itemIds: React.PropTypes.array,
		list: React.PropTypes.object,
		onCancel: React.PropTypes.func,
		onUpload: React.PropTypes.func,
	},
	getDefaultProps () {
		return {
			isOpen: false,
		};
	},
	getInitialState () {
		return {
			fields: [],
		};
	},
	componentDidMount () {
		this.doFocus();
	},
	componentDidUpdate () {
		this.doFocus();
	},
	doFocus () {
		if (this.refs.focusTarget) {
			findDOMNode(this.refs.focusTarget).focus();
		}
	},
	getOptions () {
		const { fields } = this.props.list;
		return Object.keys(fields).map(key => ({ value: fields[key].path, label: fields[key].label }));
	},
	getFieldProps (field) {
		var props = assign({}, field);
		props.value = this.state.fields[field.path];
		props.values = this.state.fields;
		props.onChange = this.handleChange;
		props.mode = 'create';
		props.key = field.path;
		return props;
	},
	updateOptions (fields) {
		this.setState({
			fields: fields,
		}, this.doFocus);
	},
	handleChange (value) {
		console.log('handleChange:', value);
	},
	handleClose () {
		this.setState({
			fields: [],
		});
		this.props.onCancel();
	},

	renderForm () {
		const { itemIds, list } = this.props;
		const formAction = `/addon/upload/${list.plural}`;

		return (
			<Form layout='horizontal' action={formAction} noValidate='true' encType='multipart/form-data' method='post'>
				<Modal.Header
					onClose={this.handleClose}
					showCloseButton
					text={'Upload CSV for ' + list.plural}
				/>
				<Modal.Body>
					CSV File :  <input type='file' id='csvFile' accept='.csv' name='csvFile'/>
				</Modal.Body>
				<Modal.Footer>
					<Button color='success' type='submit' data-button-type='submit'>Update</Button>
					<Button color='cancel' variant='link' onClick={this.handleClose}>Cancel</Button>
				</Modal.Footer>
			</Form>
		);
	},
	render () {
		return (
			<Modal.Dialog isOpen={this.props.isOpen} onClose={this.handleClose} backdropClosesModal>
				{this.renderForm()}
			</Modal.Dialog>
		);
	},
});

module.exports = UploadForm;
