<script setup lang="ts">
const {isOpen, open, close} = useModal();
</script>

<template>
    <div class="constructor">
        <h3 class="constructor__title block-title">Constructor</h3>
        <div class="constructor__input-property">
            <p class="constructor__input-property-name">
                Poll name
            </p>
            <UiMyInput type="text" placeholder="Write the name here..." custom-class="constructor__input-elem"/>
        </div>
        <div class="constructor__input-property">
            <p class="constructor__input-property-name">
                Poll description
            </p>
            <UiMyInput type="text" placeholder="Write the description here..." custom-class="constructor__input-elem"/>
        </div>
        <div class="constructor__questions">
            <p class="constructor__questions-notation">Poll Questions</p>
            <ul class="constructor__question-list">
                <DomainCreateQuestionItem :order="1" text="What is your favorite color?" type="TEXT" />
                <DomainCreateQuestionItem :order="2" text="What the fuck are you?" type="IMAGE_CHOICE" />
            </ul>
            <UiMyButton class="constructor__questions-add-btn" icon="plus" :icon-with-round="true" @click="open">Add a question</UiMyButton>
        </div>
        <div class="constructor__control-btns">
            <UiMyButton btn-type="bordered" icon="add-file">Create Poll</UiMyButton>
            <UiMyButton btn-type="bordered" icon="draft">Save draft</UiMyButton>
        </div>
    <ModalsCreateQuestionModal v-if="isOpen" :is-show-modal="isOpen" @close="close" @create="(question) => console.log(question)" />
    </div>
</template>

<style scoped>
.constructor {
    flex-grow: 4;
    padding: 10px 20px;

    border-radius: 10px;
    background-color: var(--surface-alf-50);
}

.constructor__title {
    margin-bottom: 10px;
}

.constructor__input-property {
    margin-bottom: 15px;
}

.constructor__input-elem {
    width: 100%;
}

.constructor__input-property-name {
    margin-bottom: 8px;
}

.constructor__questions {
    padding: 10px;
    border-radius: 10px;
    background: var(--surface);
}

.constructor__questions-notation {
    font-weight: 600;
    font-size: 16px;
    color: var(--text-primary);
}

.constructor__question-list {
    margin-top: 15px;
    margin-bottom: 15px;
    display: flex;
    flex-direction: column;
    gap: 10px;
}

.constructor__questions-add-btn {
    justify-self: center;
}

.constructor__control-btns {
    margin-top: 20px;
    /* margin-bottom: 5px; */
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 50px;
}
</style>