import axios from 'axios'

const HUBSPOT_ID = process.env.NEXT_PUBLIC_HUBSPOT_ID

const postModalFields = async (
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
        { name: 'email', value: data.email },
        {
          name: 'bedroom_preference',
          value: data.bedrooms ? data.bedrooms.join(';') : '',
        },
        {
          name: 'interested_cities',
          value: data.locations_of_interest
            ? data.locations_of_interest.join(';')
            : '',
        },
        {
          name: 'price_range',
          value: data.price_range ? data.price_range.join(';') : '',
        },
        {
          name: 'buyingtimelinedec2023',
          value: data.when_are_you_looking_to_buy
            ? data.when_are_you_looking_to_buy
            : '',
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
  console.log('submitting form', formType)

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
  } else if (formType === 'unit') {
    response = await postUnitFields(data, portalId, formGuid, config, hutk)
  }

  return response
}
