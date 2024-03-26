import moment from 'moment';

export const isDate = ( value ) => {
    console.log(value)
    if( !value ) return false

    const date = moment(value);
    if ( date.isValid() ){
        return true;
    }
    return false;
}

