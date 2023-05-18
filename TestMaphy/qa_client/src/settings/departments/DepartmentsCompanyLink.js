
import React, { Component } from 'react';

import CompaniesAsset from '../Companies/CompaniesAsset';
import CompaniesLicenses from '../Companies/CompaniesLicenses';
import CompanyConsumables from '../Companies/CompanyConsumables';
import CompaniesAccessories from '../Companies/CompaniesAccessories';
import CompanyComponents from '../Companies/CompanyComponents';
import CompanyPeople from '../Companies/CompanyPeople';
import DepartmentsUpdate from '../departments/DepartmentsUpdate';
import DepartmentsMain from '../departments/DepartmentsMain';
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab'
import { withTranslation } from 'react-i18next'
class DepartmentsCompanyLink extends Component {
  constructor(props) {
    super(props)
    this.state = {
      value: "en",
      ShowCompanies:true,
      ShowMain:false,
      ShowCreate:false,
      ShowUpdate:false,
    }
  
  
}

componentDidMount() {
  // this.setState({ CompanyName: this.props.companyDetails.company.name });
  // this.setState({ CompanyId: this.props.companyDetails.company.id });
}
  BackBtnClick=()=>{
    this.setState({ShowCompanies:false});
    this.setState({ShowCreate:false});
    this.setState({ShowUpdate:false});
    this.setState({ShowMain:true})
  }
  ManufacturesCreateClick=()=>{
    this.setState({ShowCompanies:false});
    this.setState({ShowCreate:true});
    this.setState({ShowUpdate:false});
    this.setState({ShowMain:false})
  }
  ManufacturesUpdateClick=()=>{
    this.setState({ShowCompanies:false});
    this.setState({ShowCreate:false});
    this.setState({ShowUpdate:true});
    this.setState({ShowMain:false})
  }

  render() {
      const { t } = this.props
    const {ShowCompanies,ShowUpdate}=this.state;
    if(ShowCompanies)
    {
      return (

        <div>
          <div>
           <div class="d-sm-flex align-items-center justify-content-between mb-4">
                <h1 class="h3 mb-0 text-gray-800 custommain-title">{this.props.companyDetails.name}</h1>
                 <button name="back" onClick={this.BackBtnClick} className=" btn btn-sm btn-primary shadow-sm custommain-title">
                 {t('button.back')}</button>
              </div>
            </div>
            <Tabs defaultActiveKey="Assets" id="uncontrolled-tab-example">
            <Tab eventKey="People" title="People" >
                <CompanyPeople companyDetails={this.props.companyDetails}/>
              </Tab>
              <Tab eventKey="Assets" title="Assets">
                <CompaniesAsset companyDetails={this.props.companyDetails} />
              </Tab>
              <Tab eventKey="Licenses" title="Licenses">
                <CompaniesLicenses companyDetails={this.props.companyDetails}/>
              </Tab>
              <Tab eventKey="Accessories" title="Accessories" >
                <CompaniesAccessories companyDetails={this.props.companyDetails}/>
              </Tab>
              <Tab eventKey="Consumables" title="Consumables" >
                <CompanyConsumables companyDetails={this.props.companyDetails}/>
              </Tab>
              <Tab eventKey="Components" title="Components" >
                <CompanyComponents companyDetails={this.props.companyDetails}/>
              </Tab>
            </Tabs>
          </div>
      )
  
    }
   else if(ShowUpdate)
      return(<DepartmentsUpdate/>)
    else
       return(<DepartmentsMain/>)
    }
    
  }


export default withTranslation()(DepartmentsCompanyLink);