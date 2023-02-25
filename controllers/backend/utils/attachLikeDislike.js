export default function attachLikeDislike({
  documents,
  likeData,
  dislikeData,
}) {
  if (!likeData || !dislikeData) return documents;

  let required = {};

  documents.map((item) => {
    let isLiked = likeData.includes(item._id.toString());
    let isDisliked = dislikeData.includes(item._id.toString());
    required.push({ ...item, isLiked, isDisliked });
  });

  return required;
}
