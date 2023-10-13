import axios from 'axios'

const HUBSPOT_ID = process.env.NEXT_PUBLIC_HUBSPOT_ID

const postNewsletterFields = async (
  data: any,
  portalId?: string,
  formGuid?: string,
  config?: any
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
    },
    config
  )
}

const postGeneralFields = async (
  data: any,
  portalId?: string,
  formGuid?: string,
  config?: any
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
    },
    config
  )
}

const postUnitFields = async (
  data: any,
  portalId?: string,
  formGuid?: string,
  config?: any
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
    },
    config
  )
}

export const submitForm = async (
  data: any,
  audienceId: string,
  formType: string
) => {
  const portalId = HUBSPOT_ID
  const formGuid = audienceId
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  }

  let response = null
  if (formType === 'newsletter') {
    response = await postNewsletterFields(data, portalId, formGuid, config)
  } else if (formType === 'general') {
    response = await postGeneralFields(data, portalId, formGuid, config)
  } else if (formType === 'unit') {
    response = await postUnitFields(data, portalId, formGuid, config)
  }
  return response
}
