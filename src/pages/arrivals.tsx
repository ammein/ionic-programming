import React, { ReactNode } from 'react';
import { IonList, IonItem, IonLabel } from '@ionic/react';
import Content from '../HOC/content';
import { Props } from '../utils/allProps';
import axios from 'axios';

class Arrivals extends React.Component<Props , {}> {

    state = {
        data : []
    }

    componentDidMount(){
        axios.get('/posts')
            .then((res: any) => {
                const getData = res.data.slice(0, 4);
                this.setState({
                    data : getData
                })
            }).catch((err: any) => {
                console.log(err);
            });
    }

    renderListData = () : ReactNode | any =>{
        const data = this.state.data;

        return data.map((value :any, i:any)=>{
            return (
                <IonItem key={i + value.userId}>
                    <IonLabel>{value.title}</IonLabel>
                </IonItem>
            );
        })
    }

    render(){
        console.log("State : \n",this.state);
        return (
            <>
                <Content>
                    {/*-- List of Text Items --*/}
                    <IonList>
                        {this.renderListData()}
                    </IonList>
                </Content>
            </>
        )
    }
}

export default Arrivals;