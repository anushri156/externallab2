import React, {Component} from 'react';


class CalculatorComponent extends Component
{
    constructor(props)
    {
        super(props);
        this.state = {
            num:''
        };
    }
    

c = () => {
        this.setState({num:''});
    }

    v = (evt) => {
        this.setState({num: this.state.num + evt.target.value});
    }

    
    e = () =>{

        try{
            let val = eval(this.state.num);
           // this.clr();
            this.setState({num: val});
        }
        catch(err){
           // this.clr();
            this.setState({num: "Invalid"});
        }

    }

    render()
    {return(
    <body>
        <div class="container">
            <div class="display"><input type="text"  size="16" value={this.state.num} onChange={this.v.bind(this)}></input></div>
            <div class="keys">
                <p><input type="button" class="button gray" value="C" onClick={this.c.bind(this)}></input>
                   <input type="button" class="button gray"  value="+/-" onClick={this.v.bind(this)}></input>
                   <input type="button" class="button gray" value="%" onClick={this.v.bind(this)}></input>
                   <input type="button" class="button yellow"  value="/" onClick={this.v.bind(this)}></input>
               </p>
                <p><input type="button" class="button black"  value="7" onClick={this.v.bind(this)}></input>
                    <input type="button"  class="button black" value="8" onClick={this.c.bind(this)}></input>
                    <input type="button" class="button black" value="9"  onClick={this.v.bind(this)}></input>
                    <input type="button" class="button yellow" value="*" onClick={this.v.bind(this)}></input>
                </p>
                <p><input type="button" class="button black" value="4" onClick={this.v.bind(this)}></input>
                    <input type="button"  class="button black" value="5" onClick={this.v.bind(this)}></input>
                    <input type="button" class="button black" value="6" onClick={this.v.bind(this)}></input>
                    <input type="button"  class="button yellow" value="-" onClick={this.v.bind(this)}></input>
                </p>
                <p><input type="button" class="button black"  value="1" onClick={this.v.bind(this)}></input>
                    <input type="button"  class="button black" value="2" onClick={this.v.bind(this)}></input>
                    <input type="button" class="button black" value="3"  onClick={this.v.bind(this)}></input>
                    <input type="button" class="button yellow" value="+" onClick={this.v.bind(this)}></input>
                </p>
                <p><input type="button" class="button blackzero" value="0" onClick={this.v.bind(this)}></input>
                    <input type="button" class="button black" value="." onClick={this.v.bind(this)}></input>
                    <input type="button" class="button yellow" value="=" onClick={this.e.bind(this)}></input>
                </p>
            </div>
            </div>
            
        
    </body>
    );
   
  }
  }

export default CalculatorComponent;