import React from "react";
import './Tag.scss'

export default function Tag({tag, onDelete}) {
    return (
        <div className="new-article__form_tags_container_tag">
            <span className="new-article__form_item_input tag">{tag}</span>
            <button type='button' className="new-article__form_tags_delete" onClick={onDelete}>Delete</button>
        </div>
    )
}