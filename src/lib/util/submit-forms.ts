import axios from 'axios'

const HUBSPOT_ID = process.env.NEXT_PUBLIC_HUBSPOT_ID

const postModalFields = async (
  data: any,
  portalId?: string,
  formGuid?: string,
  config?: any,
  hutk?: string
) => {
  console.log(
    `${data.LA};${data.NYC};${data.Paris};${data.London};${data.Berlin};${data.CDMX};${data.Else}`
  )
  return await axios.post(
    `https://api.hsforms.com/submissions/v3/integration/submit/${portalId}/${formGuid}`,
    {
      portalId,
      formGuid,
      fields: [
        { name: 'firstname', value: data.first_name },
        { name: 'lastname', value: data.last_name },
        { name: 'email', value: data.email },
        {
          name: 'units_interested',
          value: !data.units_interested
            ? 'false;false;false;false;false'
            : `${data.units_interested?.includes(
                '#6'
              )};${data.units_interested?.includes(
                '#7'
              )};${data.units_interested?.includes(
                'Unit 3B'
              )};${data.units_interested?.includes(
                'Unit 4A'
              )};${data.units_interested?.includes('Unit 6B')}`,
        },
        {
          name: 'bedroom_preference',
          value: `${data.n1_bedroom};${data.n2_bedrooms};${data.n3_bedrooms};${data.studio}`,
        },
        {
          name: 'interested_cities',
          value:
            data.LA == undefined
              ? 'false;false;false;false;false;false;false'
              : `${data.LA};${data.NYC};${data.Paris};${data.London};${data.Berlin};${data.CDMX};${data.Else}`,
        },
        {
          name: 'when_are_you_looking_to_buy',
          value: data.when_are_you_looking_to_buy
            ? data.when_are_you_looking_to_buy
            : 'NA',
        },
        { name: 'city_general', value: data.City ? data.City : '' },
        {
          name: 'current_country',
          value: data.current_country ? data.current_country : '',
        },
        {
          name: 'current_zip_code',
          value: data.current_zip_code ? data.current_zip_code : '',
        },
      ],
      context: {
        hutk: hutk ? hutk : 'none available',
        pageUri: document.URL,
        pageName: document.title,
      },
    },
    config
  )
}
const postContactFields = async (
  data: any,
  portalId?: string,
  formGuid?: string,
  config?: any,
  hutk?: string
) => {
  return await axios.post(
    `https://api.hsforms.com/submissions/v3/integration/submit/${portalId}/${formGuid}`,
    {
      portalId,
      formGuid,
      fields: [
        { name: 'email', value: data.email },
        { name: 'firstname', value: data.first_name },
        { name: 'lastname', value: data.last_name },
        { name: 'hs_persona', value: data.hs_persona },
        { name: 'message', value: data.message },
      ],
      context: {
        hutk: hutk ? hutk : 'none available',
        pageUri: document.URL,
        pageName: document.title,
      },
    },
    config
  )
}

const postNewsletterFields = async (
  data: any,
  portalId?: string,
  formGuid?: string,
  config?: any,
  hutk?: string
) => {
  return await axios.post(
    `https://api.hsforms.com/submissions/v3/integration/submit/${portalId}/${formGuid}`,
    {
      portalId,
      formGuid,
      fields: [
        {
          name: 'email',
          value: data.email,
        },
        { name: 'berlin', value: data.Berlin },
        { name: 'la', value: data.LA },
        { name: 'london', value: data.London },
        { name: 'nyc', value: data.NYC },
        { name: 'paris', value: data.Paris },
        { name: 'cdmx', value: data.CDMX },
        { name: 'else', value: data.Else },
        { name: 'city', value: data.City },
      ],
      context: {
        hutk: hutk ? hutk : 'none available',
        pageUri: document.URL,
        pageName: document.title,
      },
    },
    config
  )
}

const postGeneralFields = async (
  data: any,
  portalId?: string,
  formGuid?: string,
  config?: any,
  hutk?: string
) => {
  return await axios.post(
    `https://api.hsforms.com/submissions/v3/integration/submit/${portalId}/${formGuid}`,
    {
      portalId,
      formGuid,
      fields: [
        { name: 'firstname', value: data.first_name },
        { name: 'lastname', value: data.last_name },
        {
          name: 'email',
          value: data.email,
        },
        { name: 'berlin_general', value: data.Berlin },
        { name: 'la_general', value: data.LA },
        { name: 'london_general', value: data.London },
        { name: 'nyc_general', value: data.NYC },
        { name: 'paris_general', value: data.Paris },
        { name: 'cdmx_general', value: data.CDMX },
        { name: 'else_general', value: data.Else },
        { name: 'city_general', value: data.City },
      ],
      context: {
        hutk: hutk ? hutk : 'none available',
        pageUri: document.URL,
        pageName: document.title,
      },
    },
    config
  )
}

const postUnitFields = async (
  data: any,
  portalId?: string,
  formGuid?: string,
  config?: any,
  hutk?: string
) => {
  return await axios.post(
    `https://api.hsforms.com/submissions/v3/integration/submit/${portalId}/${formGuid}`,
    {
      portalId,
      formGuid,
      fields: [
        {
          name: 'firstname',
          value: data.first_name,
        },
        {
          name: 'lastname',
          value: data.last_name,
        },

        {
          name: 'email',
          value: data.email,
        },
        {
          name: 'unit_of_interest',
          value: data.unit_of_interest,
        },
      ],
      context: {
        hutk: hutk ? hutk : 'none available',
        pageUri: document.URL,
        pageName: document.title,
      },
    },
    config
  )
}

export const submitForm = async (
  data: any,
  audienceId: string,
  formType: string,
  hutk?: string
) => {
  const portalId = HUBSPOT_ID
  const formGuid = audienceId
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  }
  console.log('data', data)
  let response = null
  if (formType === 'newsletter') {
    response = await postNewsletterFields(
      data,
      portalId,
      formGuid,
      config,
      hutk
    )
  } else if (formType === 'modal') {
    response = await postModalFields(data, portalId, formGuid, config, hutk)
  } else if (formType === 'contact') {
    response = await postContactFields(data, portalId, formGuid, config, hutk)
  }

  return response
}
