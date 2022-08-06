import { decode } from 'js-base64';

export const getJson = (idHash) => {
  return JSON.parse(decode(idHash))
}

export default function handler(req, res) {
  const { idcv } = req.query
  res.status(200).json(getJson(idcv))
}
