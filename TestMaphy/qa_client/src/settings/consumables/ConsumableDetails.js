
import React, { Component } from 'react';
import axios from 'axios';
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import ToolkitProvider, { CSVExport } from 'react-bootstrap-table2-toolkit';
import { withTranslation} from 'react-i18next'

import ConsumablesMain from './ConsumablesMain';
import ConsumablesCreate from './ConsumablesCreate';


const Domain = process.env.REACT_APP_URL;

const RemoteAll = ({ data,
  page,
  sizePerPage,
  defaultSorted,
  totalSize,
  onTableChange,
  columns,
  myChangeHandler,
  SearchBtnClick,
  indication,
  ExportCSVButton,
  CustomToggleList }) => (
  <div>
    <ToolkitProvider
      keyField="id"
      data={data}
      columns={columns}
      defaultSorted={defaultSorted}
      noDataIndication={indication}
      search
      exportCSV
      columnToggle >
      {toolkitprops => [
        <div className="custom-table  custom-tablelayout"  >
        <div class="col">
            <div class="row">
            <div class="btn-group" role="group" >
               <CustomToggleList {...toolkitprops.columnToggleProps} />
             <div> <input type='text' placeholder="search" name="searchText"   onChange={myChangeHandler} disabled/>
                <button type='input'  data-tooltip="true" title="Search" class="custombg-search" onClick={SearchBtnClick}><i class="fa fa-search"></i></button></div>
                <ExportCSVButton {...toolkitprops.csvProps} class="btn-default custombg-search" data-tooltip="true" title="Export CSV"><i class="fa fa-download"></i></ExportCSVButton>&nbsp;
             </div>
                    </div> 
              <BootstrapTable
                {...toolkitprops.baseProps}
                remote={{ pagination: true, sort: true }}
                keyField="id"
                pagination={paginationFactory({ page, sizePerPage, totalSize })}
                onTableChange={onTableChange}

                data={data} columns={columns} noDataIndication="No Data Available"
                wrapperClasses="table-responsive table table-striped "

              />
            </div>
          </div>
      ]}
    </ToolkitProvider>
  </div>
);
class ConsumableDetails extends Component {
  constructor(props) {
    super(props)
    this.state = {
      value: "en",
      ConsumablesData: [],
      ConsumablesId: '',
      ConsumablesIdToUpdate: '',
      ConsumablesDatatoUpdate: '',
      ConsumablesDataTotal: '',
      //CompanyId_Details: '',

      ShowCreate: false,
      ShowMain: false,
      ShowUpdate: false,
      //ShowDetails: false,
      NotificationMessage: '',
      showNotifications: false,

      offset: 0,
      sortField: 'id',
      sortOrder: 'desc',
      page: 1,
      sizePerPage: 10,
      searchText: '',
      columns: [
        {
          dataField: 'name',
          text: 'User',
          sort: true,
          headerStyle: { 'white-space': 'nowrap' }
        },
        {
          dataField: 'created_at.formatted',
          text: 'Date',
          sort: false,
          headerStyle: { 'white-space': 'nowrap' }
        },
        {
          dataField: 'admin',
          text: 'Admin',
          sort: true,
          headerStyle: { 'white-space': 'nowrap' }
        },

      ]
    }
    this.handleTableChange = this.handleTableChange.bind(this);
    //this.handleTableChange = this.handleTableChange.bind(this);
  }



  componentDidMount() {
    this.setState({ NotificationMessage: this.props.NotificationMessage });
    this.setState({ showNotifications: this.props.showNotifications });
    this.callServerData(this.state.page);
  }

  callServerData() {
    const url = Domain + '/consumables/view/' + this.props.ConsumablesDatatoUpdate.id + '/users?' +
      'limit=' + this.state.sizePerPage +
      '&offset=' + this.state.offset +
      '&search=' + this.state.searchText +
      '&sort=' + this.state.sortField +
      '&order=' + this.state.sortOrder + '';

    axios.get(url)
      .then((response) => {
        this.setState({ ConsumablesData: response.data.rows });
        this.setState({ ConsumablesDataTotal: response.data.total });
      });
  }

  myColumnToggle = (df, columns) => {
    var newTableColumns = columns.map((val) => {
      if (val.dataField === df) {
        val.hidden = !val.hidden
      }
      return val;
    });
    this.setState({ columns: newTableColumns })
  }

  deleteConsumables = (id) => {

    const url = Domain + '/consumables/' + id;
    axios.delete(url)
      .then((response) => {
        this.setState({ showNotifications: true });
        this.setState({ NotificationMessage: response.data.messages });
        this.setState({ ConsumablesData: this.state.ConsumablesData.filter(result => result.id !== id) });
      })
  }

  BackBtnClick = () => {
    const { ShowMain } = this.state;
    this.setState({ ShowMain: !ShowMain });
  };


  myChangeHandler = (event) => {

    this.setState({ [event.target.name]: event.target.value });
  }

  SearchBtnClick = () => {
    this.callServerData();
  }

  handleTableChange = async (type, { page, sizePerPage, sortField, sortOrder }) => {
    const offset = (page - 1) * sizePerPage;
    if (sortField == null || sortField === 'undefined')
      sortField = this.state.sortField;
    if (sortOrder == null || sortOrder==='undefined')
      sortOrder = this.state.sortOrder;

    await this.setState({ page: page, offset: offset, sizePerPage: sizePerPage, sortField: sortField, sortOrder: sortOrder });
    this.callServerData();
  }
  onLanguageHandle = (event) => {
    let newLang = event.target.value;
    this.setState({ value: newLang })
    this.props.i18n.changeLanguage(newLang)
  }
  render() {
    const { ShowCreate, ShowMain } = this.state;
    const { ConsumablesData, sizePerPage, page } = this.state;
    const { t } = this.props;

    const { ExportCSVButton } = CSVExport;
    const CustomToggleList = ({ columns, onColumnToggle, toggles }) => (
      <div className="text-center">
        <div class="pull-left">
          <div class="btn-group pull-left">
          <button class=" btn-default dropdown-toggle customcolumns-csv" data-toggle="dropdown" data-tooltip="true" title="Columns"><i class="fa fa-columns"></i>

</button>
            <ul class="dropdown-menu customcolumn-scroll">

              {columns
                .map(column => ({
                  ...column,
                  toggle: toggles[column.dataField]
                }))
                .map((column, index) => (
                  <React.Fragment >

                    <label className="custom-toggle custom-table table-responsive" >
                      <input type="checkbox" key={column.dataField} id={column.dataField} checked={column.toggle} aria-checked={column.toggle ? "true" : "false"}
                        onChange={() => this.myColumnToggle(column.dataField, columns)} />
                      &nbsp;
                      {column.text}
                    </label>
                  </React.Fragment>
                ))}
            </ul>
          </div>
        </div>
      </div>

    );
    if (ShowCreate) {
      return (
        <ConsumablesCreate />
      )
    }

    else if (ShowMain) {
      return (
        <ConsumablesMain />
      )
    }

    else {
      return (
        <div>
          <div >
            <div class="d-sm-flex align-items-center justify-content-between mb-4">
              <h1 class="h3 mb-0 text-gray-800 custommain-title">{t('consumable.consumablename')}</h1>

              <div class="row">
                <div class="col">
                  <button onClick={this.BackBtnClick} className=" btn btn-sm btn-primary shadow-sm custommain-title">
                    {t('button.back')}
                  </button>
                </div>
              </div>
            </div>
            <div >
              <RemoteAll

                data={ConsumablesData}
                page={page}
                sizePerPage={sizePerPage}
                totalSize={this.state.ConsumablesDataTotal}
                columns={this.state.columns}
                CSVExport={CSVExport}
                ExportCSVButton={ExportCSVButton}
                CustomToggleList={CustomToggleList}
                onTableChange={this.handleTableChange}
                myChangeHandler={this.myChangeHandler}
                SearchBtnClick={this.SearchBtnClick}

              />
            </div>
          </div>

        </div>

      )
    }
  }
}
export default withTranslation()(ConsumableDetails);

